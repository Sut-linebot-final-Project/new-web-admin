
import React from 'react';
// import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Toolbar from '@mui/material/Toolbar';
import { Link, Outlet } from 'react-router-dom';
import { Home } from '@mui/icons-material';
// import './layout/Layout.css'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Paper from '@mui/material/Paper';
import { Button, styled } from '@mui/material';


const drawerWidth = 240;
// interface LayoutProps {
//   children: ReactNode;
// }

const BodyPaper = styled(Paper)(({ theme }) => ({

  padding: theme.spacing(1),
  ...theme.typography.body2,

}));

export default function Layout(): JSX.Element {
  const [level, setLevel] = React.useState<String>("");
  const elevation = 8;
  // const classes = useStyles();


  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  React.useEffect(() => {
    const level = localStorage.getItem("level");
    if (level) {
      setLevel(level);

    }
  }, []);
  const drawer = (
    <div>

      <Toolbar />
      <Divider />

      <List>
        <Link to={'/'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BodyPaper elevation={elevation}><Home /></BodyPaper>

              </ListItemIcon>
              <ListItemText primary={"หน้าแรก"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={'/Intent'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BodyPaper elevation={elevation}>
                  <FormatListBulletedIcon />
                </BodyPaper>
              </ListItemIcon>
              <ListItemText primary={"หัวข้อ"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={'/Training'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BodyPaper elevation={elevation}>
                  <QuestionAnswerIcon />
                </BodyPaper>
              </ListItemIcon>
              <ListItemText primary={"คำถามที่ตอบไม่ได้"} />
            </ListItemButton>
          </ListItem>
        </Link>

        {level == 'root' ? <Link to={'/User'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BodyPaper elevation={elevation}><SupervisedUserCircleIcon /></BodyPaper>
              </ListItemIcon>
              <ListItemText primary={"จัดการผู้ใช้งาน"} />
            </ListItemButton>
          </ListItem>
        </Link> : ''}



      </List>

    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        color="warning"
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          textAlign: 'end',

        }}
      >
        <Toolbar>
          <Box sx={{flexGrow:1}}>
          <Button sx={{color:"#00ff00"}} onClick={signout}>
            ออกจากระบบ
          </Button>
          </Box>
        </Toolbar>

      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%', paddingTop: 20 }}>
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </div>
    </Box>


  )

}