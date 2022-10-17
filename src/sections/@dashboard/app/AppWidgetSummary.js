// @mui
import PropTypes, { func } from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  pyx: PropTypes.number,
  subtitle: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.string,
  sx: PropTypes.object,
  funcs:PropTypes.object
};

export default function AppWidgetSummary({ title, total, icon, color = 'primary', pyx = 10, funcs={func:()=>{}} , subtitle,sx, ...other }) {


  const IconReturner = () => {
    if (icon === undefined) {
      return (
        null
      )
    } 
    if(icon!==undefined) {
      return (
        <IconWrapperStyle
          sx={{
            color: (theme) => theme.palette[color].dark,
            backgroundImage: (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                theme.palette[color].dark,
                0.24
              )} 100%)`,
          }}
        >
          <Iconify icon={icon} width={24} height={24} />
        </IconWrapperStyle>
      )
    }
  }

  return (
    <Card onClick={funcs.func}
      sx={{
        py: pyx,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        cursor:"pointer",
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >

        <IconReturner/>

      <Typography variant="h3">{title}</Typography>

      <Typography variant="h4">{subtitle}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.85 }}>
        {total}
      </Typography>
    </Card>
  );
}
