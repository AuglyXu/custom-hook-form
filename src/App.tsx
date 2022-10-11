import React from 'react'
import { Divider, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import styles from './AppStyle';
import BasicFormDemo from './Demo/BasicFormDemo'
import CustomValidateDemo from './Demo/CustomValidateDemo';
import CustomFormComponent from './Demo/CustomFormComponent';
import CustomLayout from './Demo/CustomLayout'
import CustomWrapperComponent from './Demo/CustomWrapperComponent'
import DynamicFormBasicDemo from './Demo/DynamicFormBasicDemo';
import GlobalWatchFormDemo from './Demo/GlobalWatchFormDemo';

interface AppProps extends WithStyles<typeof styles> { }

const App: React.FC<AppProps> = (props: AppProps) => {
  const { classes } = props
  return (
    <>
      <Typography variant="h5" gutterBottom>
        静态表单
      </Typography>
      <BasicFormDemo />
      <Divider variant='middle' classes={{ root: classes.dividerMargin }} />
      <CustomValidateDemo />
      <Divider variant='middle' classes={{ root: classes.dividerMargin }} />
      <CustomFormComponent />
      <Divider variant='middle' classes={{ root: classes.dividerMargin }} />
      <CustomLayout />
      <Divider variant='middle' classes={{ root: classes.dividerMargin }} />
      <GlobalWatchFormDemo />
      <Divider variant='middle' classes={{ root: classes.dividerMargin }} />
      <CustomWrapperComponent />
      <Divider variant='middle' classes={{ root: classes.dividerMargin }} />
      <Typography variant="h5" gutterBottom>
        动态大剂量表单
      </Typography>
      <DynamicFormBasicDemo />
    </>
  );
}

export default withStyles(styles)(App);
