// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu, { MenuProps } from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// // import { IIntentlist } from '../../pages/intent/interface';

// import { styled, alpha } from '@mui/material/styles';

// import EditIcon from '@mui/icons-material/Edit';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import DeleteIcon from '@mui/icons-material/Delete';
// import TrainingModal from './trainModal';


// const StyledMenu = styled((props: MenuProps) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'right',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'right',
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   '& .MuiPaper-root': {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 180,
//     color:
//       theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
//     boxShadow:
//       'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//     '& .MuiMenu-list': {
//       padding: '4px 0',
//     },
//     '& .MuiMenuItem-root': {
//       '& .MuiSvgIcon-root': {
//         fontSize: 18,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//       },
//       '&:active': {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity,
//         ),
//       },
//     },
//   },
// }));

// const TrianningMenu: React.FC<{ word: string,id:number }> = ({ word,id }) => {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const [type, setType] = React.useState<string>('')
//   const [isDialogOpen, setDialogOpen] = React.useState(false);

//   const handleOpenDialog = () => {
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//   };
//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };


//   return (
//     <div>
//       <TrainingModal isOpen={isDialogOpen} onClose={handleCloseDialog} word={word} type={type} />
//       <div>
//         <Button
//           id="demo-customized-button"
//           aria-controls={open ? 'demo-customized-menu' : undefined}
//           aria-haspopup="true"
//           aria-expanded={open ? 'true' : undefined}
//           variant="contained"
//           color='secondary'
//           disableElevation
//           onClick={handleClick}
//           endIcon={<KeyboardArrowDownIcon />}
//         >

//           OPTIONS
//         </Button>
//         <StyledMenu
//           id="basic-menu"
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleClose}
//           MenuListProps={{
//             'aria-labelledby': 'basic-button',
//           }}
//         >
//           <MenuItem onClick={() => { handleOpenDialog(); handleClose(); setType('Assign') }} disableRipple>
//             <EditIcon />
//             Assign
//           </MenuItem>

//           <MenuItem onClick={() => { handleOpenDialog(); handleClose(); setType('Delete') }} disableRipple>
//             <DeleteIcon />
//             Delete
//           </MenuItem>
//         </StyledMenu>
//       </div>
//     </div>
//   );
// }
// export default TrianningMenu;