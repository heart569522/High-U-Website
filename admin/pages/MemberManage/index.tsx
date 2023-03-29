import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import MaterialReactTable, {
  type MaterialReactTableProps,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import {
  Box,
  Typography,
  Toolbar,
  Grid,
  Button,
  Tooltip,
  IconButton,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  Stack,
  DialogActions,
  Avatar,
  Input
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Delete, Edit } from '@mui/icons-material';

import { storage } from '../api/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

type Props = {
  members: [Member]
}

type Member = {
  _id: string;
  image: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

export async function getServerSideProps() {
  try {
    let membersResponse = await fetch("http://localhost:8000/api/member/getAllMember");
    let members = await membersResponse.json();
    return {
      props: { members: JSON.parse(JSON.stringify(members)) }
    }
  } catch (e) {
    console.error(e);
  }
  return {
    props: {}
  };
}

const drawerWidth = 240;
const theme = createTheme({
  typography: {
    fontFamily: [
      'Prompt, sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      main: "#F0CA83",
    },
    secondary: {
      main: "#303030"
    }
  },
});

export default function MemberManage(props: Props) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<[Member]>(props.members);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const handleCreateNewRow = (values: Member) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits: MaterialReactTableProps<Member>['onEditingRowSave'] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        tableData[row.index] = values;
        //send/receive api updates here, then refetch or update local table data for re-render
        setTableData([...tableData]);
        exitEditingMode(); //required to exit editing mode and close modal
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row: MRT_Row<Member>) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue('firstname')}`)) {
        return;
      }

      try {
        await handleDeleteMember(row.original._id);
        // Refetch or update local table data for re-render
        tableData.splice(row.index, 1);
        setTableData([...tableData]);
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    },
    [tableData],
  );

  const handleDeleteMember = async (memberId: string) => {
    try {
      let response = await fetch("http://localhost:8000/api/member/deleteMember?id=" + memberId, {
        method: "DELETE",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      response = await response.json();
      console.log(response);
    } catch (error) {
      console.log("An error occured while deleting ", error);
    }
  }

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<Member>,
    ): MRT_ColumnDef<Member>['muiTableBodyCellEditTextFieldProps'] => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const columns = useMemo<MRT_ColumnDef<Member>[]>(
    () => [
      {
        accessorKey: 'image', //id is still required when using accessorFn instead of accessorKey
        header: 'Image',
        size: 10,
        Cell: ({ renderedCellValue, row }) => (
          <Box className="flex">
            <Image
              alt="avatar"
              height={30}
              width={30}
              src={row.original.image}
              className="object-cover w-10 h-10 rounded-full"
            />
            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            {/* <span>{renderedCellValue}</span> */}
          </Box>
        ),
      },
      {
        accessorKey: 'firstname',
        header: 'First Name',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'lastname',
        header: 'Last Name',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'email',
        }),
      },
      {
        accessorKey: 'username',
        header: 'Username',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'password',
        header: 'Password',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps],
  );

  return (
    <ThemeProvider theme={theme}>
      <Head><title>Member Manage | High U Administrator</title></Head>
      <Box
        component="main"
        className="h-full p-5 ml-[240px] max-[899px]:ml-0"
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Head><title>Member Manage | High U</title></Head>
        <Toolbar />
        <Box className="bg-white w-full h-full rounded-xl p-5 shadow-md max-[899px]:pb-3">
          <Grid item xs={12} md={12} className="flex items-center  max-md:mb-3">
            <Typography className="text-[#303030] font-bold text-2xl pb-2 max-[450px]:text-lg">
              Member&nbsp;Manage
            </Typography>
          </Grid>
          <>
            <MaterialReactTable
              displayColumnDefOptions={{
                'mrt-row-actions': {
                  muiTableHeadCellProps: {
                    align: 'center',
                  },
                  muiTableBodyCellProps: {
                    align: 'center',
                  }
                },
                'mrt-row-numbers': {
                  muiTableHeadCellProps: {
                    align: 'center',
                  },
                  muiTableBodyCellProps: {
                    align: 'center',
                  }
                },
              }}
              columns={columns}
              data={tableData}
              editingMode="modal" //default
              enableEditing
              enableRowNumbers
              // enableRowSelection
              onEditingRowSave={handleSaveRowEdits}
              onEditingRowCancel={handleCancelRowEdits}
              renderRowActions={({ row, table }) => (
                <Box className="flex justify-center">
                  <Tooltip arrow placement="left" title="Edit">
                    <IconButton className="hover:text-amber-500" onClick={() => table.setEditingRow(row)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="right" title="Delete">
                    <IconButton className="hover:text-red-500" onClick={() => handleDeleteRow(row)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              renderTopToolbarCustomActions={() => (
                <Button
                  className="bg-[#303030] hover:bg-[#666666] text-white"
                  onClick={() => setCreateModalOpen(true)}
                  variant="contained"
                >
                  Create New Member
                </Button>
              )}
            />
            <CreateNewAccountModal
              columns={columns}
              open={createModalOpen}
              onClose={() => setCreateModalOpen(false)}
              onSubmit={handleCreateNewRow}
            />
          </>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

interface CreateModalProps {
  columns: MRT_ColumnDef<Member>[];
  onClose: () => void;
  onSubmit: (values: Member) => void;
  open: boolean;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [values, setValues] = useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {} as any),
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = { ...values, image: defaultImage };
      const response = await fetch('http://localhost:8000/api/member/addMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log(response);
      // setMessage('Member Added Successfully!');
      // setOpenAlert(true);
      onSubmit(values);
      onClose();
      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (error: any) {
      console.error(error);
      // setError('An error occurred while adding the member. Please try again later.');
      // setOpenAlert(true);
    }
  };

  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/high-u.appspot.com/o/default_images%2Fdefault-user-icon.jpg?alt=media&token=edd06ee7-020c-4436-80ae-2e175acc0584';

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle textAlign="center">Create New Member</DialogTitle>
        <DialogContent>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => {
              if (column.accessorKey === 'image') {
                return (
                  <input
                    key={column.accessorKey}
                    disabled
                    type="hidden"
                    name={column.accessorKey}
                    id={column.accessorKey}
                    value={defaultImage}
                  />
                );
              }
              if (column.accessorKey === 'email') {
                return (
                  <TextField
                    required
                    type="email"
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    value={values[column.accessorKey ?? '']}
                    onKeyDown={handleKeyPress}
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                );
              }
              return (
                <TextField
                  required
                  type="text"
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  value={values[column.accessorKey ?? '']}
                  onKeyDown={handleKeyPress}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              );
            })}
          </Stack>

        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button className="text-[#303030]" onClick={onClose}>Cancel</Button>
          <Button className="bg-[#666666] hover:bg-[#303030] text-white" type="submit" variant="contained">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );


