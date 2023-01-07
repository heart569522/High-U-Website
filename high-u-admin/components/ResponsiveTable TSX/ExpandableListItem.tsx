import React, { Component, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

interface Props {
  panelClass?: string
  summary: string | ReactElement
  details: string | ReactElement
  selected?: boolean
  scrollToSelected?: boolean | undefined
  scrollOptions?: object
  ExpansionPanelDetailsProps?: object
  ExpansionPanelDetailsTypographyProps?: object
  ExpansionPanelMoreIconProps?: object
  ExpansionPanelProps?: object
  ExpansionPanelSummaryProps?: object
  ExpansionPanelSummaryTypographyProps?: object
  SelectedExpansionPanelProps?: object
}

/**

Expandable component with header text (summary) and expandable description text (details)
*/
class ExpandableListItem extends Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selected && nextProps.scrollToSelected) {
      const element = ReactDOM.findDOMNode(this) as HTMLElement;
      if (element) {
        element.scrollIntoView(nextProps.scrollOptions || { behavior: 'smooth', block: 'center' });
      }
    }
  }

  render() {
    const {
      panelClass,
      details,
      selected,
      summary,
      ExpansionPanelDetailsProps,
      ExpansionPanelDetailsTypographyProps,
      ExpansionPanelMoreIconProps,
      ExpansionPanelProps,
      ExpansionPanelSummaryProps,
      ExpansionPanelSummaryTypographyProps,
      SelectedExpansionPanelProps,
    } = this.props;

    const rootProps = selected
      ? { ...ExpansionPanelProps, ...SelectedExpansionPanelProps }
      : ExpansionPanelProps;

    return (
      <Accordion className={panelClass && panelClass} {...rootProps} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon {...ExpansionPanelMoreIconProps} />}
          {...ExpansionPanelSummaryProps}
        >
          <Typography
            className="w-full"
            gutterBottom
            variant="subtitle1"
            {...ExpansionPanelSummaryTypographyProps}
          >
            {summary}
          </Typography>
        </AccordionSummary>
        <AccordionDetails {...ExpansionPanelDetailsProps}>
          <Typography
            className="w-full opacity-50"
            gutterBottom
            component="div"
            {...ExpansionPanelDetailsTypographyProps}
          >
            {details}
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
  }
}

export default ExpandableListItem