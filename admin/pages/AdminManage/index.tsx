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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Delete, Edit } from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { GetSessionParams, getSession } from 'next-auth/react';

type Props = {
  admins: [Admin]
}

type Admin = {
  _id: string;
  image: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context);

  if (!session) {
      return {
          redirect: {
              destination: '/',
              permanent: false,
          },
      };
  }

  try {
      const response = await fetch(`${process.env.API_URL}/api/admin/getAllAdmins`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${session.accessToken}`,
          },
      });

      if (response.ok) {
          const data = await response.json();
          return {
              props: { admins: JSON.parse(JSON.stringify(data)) }
          };
      } else {
          throw new Error('Failed to fetch data');
      }
  } catch (error) {
      console.error(error);
      return {
          props: { admins: [] },
      };
  }
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

export default function AdminManage(props: Props) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<Admin[]>(props.admins);
  const [validationErrors, setValidationErrors] = useState<{ [cellId: string]: string; }>({});
  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/high-u.appspot.com/o/default_images%2Fdefault-user-icon.jpg?alt=media&token=edd06ee7-020c-4436-80ae-2e175acc0584';

  const [roles, setRoles] = useState([]);
  useEffect(() => {
    fetch(`${process.env.API_URL}/api/admin/getRoleAdmin`)
      .then((response) => response.json())
      .then((data) => {
        setRoles(data);
      })
      .catch((error) => console.log(error));
  }, [roles]);

  const handleCreateNewRow = (values: Admin) => {
    const lastRowId = tableData[tableData.length - 1]._id;
    const newRow = { ...values, image: defaultImage, _id: lastRowId };
    setTableData([...tableData, newRow]);
  };

  const handleSaveRowEdits: MaterialReactTableProps<Admin>['onEditingRowSave'] = async ({ exitEditingMode, row, values }) => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/admin/updateAdmin?id=` + values._id, {
        method: 'POST',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      if (response.ok) {
        tableData[row.index] = values;
        setTableData([...tableData]);
        exitEditingMode();
      } else {
        throw new Error(await response.text());
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row: MRT_Row<Admin>) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue('firstname')}`)) {
        return;
      }

      try {
        await handleDeleteAdmin(row.original._id);
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

  const handleDeleteAdmin = async (adminId: string) => {
    try {
      let response = await fetch(`${process.env.API_URL}/api/admin/deleteAdmin?id=` + adminId, {
        method: "DELETE",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      response = await response.json();
    } catch (error) {
      console.log("An error occured while deleting ", error);
    }
  }

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<Admin>,
    ): MRT_ColumnDef<Admin>['muiTableBodyCellEditTextFieldProps'] => {
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

  const columns = useMemo<MRT_ColumnDef<Admin>[]>(
    () => [
      {
        accessorKey: '_id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: 'image',
        header: 'Image',
        enableEditing: false,
        enableColumnActions: false,
        size: 10,
        Cell: ({ row }) => (
          <Box className="flex">
            <Image
              alt="avatar"
              height={30}
              width={30}
              src={row.original.image}
              className="object-cover w-10 h-10 rounded-full"
            />
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
      {
        accessorKey: 'role',
        header: 'Role',
        muiTableBodyCellEditTextFieldProps: {
          select: true,
          children: roles.map((role, i) => (
            <MenuItem key={i} value={role}>
              {role}
            </MenuItem>
          )),
        },
      },
    ],
    [getCommonEditTextFieldProps, roles],
  );

  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportRows = (rows: MRT_Row<Admin>[]) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(tableData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Head><title>Admin Manage | High U Administrator</title></Head>
      <Box
        component="main"
        className="h-full p-5 ml-[240px] max-[899px]:ml-0"
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box className="bg-white w-full h-full rounded-xl p-5 shadow-md max-[899px]:pb-3">
          <Grid item xs={12} md={12} className="flex items-center  max-md:mb-3">
            <Typography className="text-[#303030] font-bold text-2xl pb-2 max-[450px]:text-lg">
              Admin&nbsp;Manage
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
              editingMode="modal"
              initialState={{ columnVisibility: { _id: false, password: false } }}
              // enableColumnVirtualization
              enableGlobalFilterModes
              enableEditing
              enableRowNumbers
              enableRowSelection
              positionToolbarAlertBanner="bottom"
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
              renderTopToolbarCustomActions={({ table }) => (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Tooltip title="Create Admin">
                    <IconButton
                      onClick={() => setCreateModalOpen(true)}
                    >
                      <PersonAddIcon className='h-8 w-8' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Export">
                    <span>
                      <Button
                        className="bg-[#ffffff] hover:bg-[#5c5c5c] pt-2 text-[#303030] hover:text-white"
                        disabled={
                          !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                        }
                        //only export selected rows
                        onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                      >
                        <FileDownloadIcon className='h-8 w-8' />
                      </Button>
                    </span>
                  </Tooltip>
                </Box>
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
  columns: MRT_ColumnDef<Admin>[];
  onClose: () => void;
  onSubmit: (values: Admin) => void;
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
      const response = await fetch(`${process.env.API_URL}/api/admin/addAdmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      // setMessage('Admin Added Successfully!');
      // setOpenAlert(true);

      onSubmit(values);
      onClose();
      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (error: any) {
      console.error(error);
      // setError('An error occurred while adding the Admin. Please try again later.');
      // setOpenAlert(true);
    }
  };

  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/high-u.appspot.com/o/default_images%2Fdefault-user-icon.jpg?alt=media&token=edd06ee7-020c-4436-80ae-2e175acc0584';

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle textAlign="center">Create New Admin</DialogTitle>
        <DialogContent>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => {
              if (column.accessorKey === '_id') {
                return (
                  <input
                    key={column.accessorKey}
                    disabled
                    type="hidden"
                  />
                );
              }
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
              if (column.accessorKey === 'role') {
                return (
                  <FormControl key={column.accessorKey} required>
                    <InputLabel>{column.header}</InputLabel>
                    <Select
                      value={values[column.accessorKey ?? '']}
                      name={column.accessorKey}
                      onChange={(e) =>
                        setValues({ ...values, [e.target.name]: e.target.value })
                      }
                      label={column.header}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={'Employee'}>Employee</MenuItem>
                      <MenuItem value={'Manager'}>Manager</MenuItem>
                    </Select>
                  </FormControl>
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


