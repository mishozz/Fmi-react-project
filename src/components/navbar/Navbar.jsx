import React, {useState} from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  IconButton
} from "@material-ui/core";
import { Link } from "react-router-dom";
import NavbarDrawer from "./NavbarDrawer";
import LoginBackdrop from '../login/LoginBackdrop'
import MenuIcon from "@material-ui/icons/Menu";
import SearchBar from '../navbar/SearchBar'
import librarySdk from '../../services/librarySdk'

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
    alignItems: "center"
  },
  drawerMenu: {
    display: "flex",
    height: "2.5rem"
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
    "&:hover": {
      color: "yellow",
    },
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
  icon:{
    color: "white"
}
}));

function Navbar({setUser, user}) {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
  }

  const logout = async () => {
    try {
      await librarySdk.logout();
      setUser(undefined);
    } catch (e) {
      console.log(e);
    }
  }

  const theme = useTheme();
  const classes = useStyles(theme);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography href="/" variant="h4" className={classes.logo}>
          <Link to="/" className={classes.logo} >E-Library</Link>       
        </Typography>
        <SearchBar/>
        {isMobile ? (
        <div className={classes.drawerMenu}>
          <NavbarDrawer
            openDrawer={openDrawer}
            openLoginBackdrop={open}
            handleDrawer={handleDrawer}
            handleLoginBackdrop={handleToggle}
            setUser={setUser}
            user={user}
            logout={logout}
            />
          <IconButton onClick={handleDrawer} className={classes.icon}>
            <MenuIcon />
          </IconButton>
        </div>
        ) : (
          <div className={classes.navlinks}>
            {!user ? (
                <>
                  <div onClick={handleToggle} className={classes.link}>
                    Login
                  </div>
                  <Link to="/register" className={classes.link}>
                    Register
                  </Link>
                </>
              ) : (
                <>
                  {user.role === "ADMIN" && 
                    <Link to="/admin" className={classes.link}>
                      Admin panel
                    </Link>
                  }
                  <Link to="/mybooks" className={classes.link}>
                    My books
                  </Link>
                  <Link to="/" onClick={logout} className={classes.link}>
                    Log out
                  </Link>
                </>
              )}
          </div>
          
        )}
        <LoginBackdrop open={open} handleToggle={handleToggle} setUser={setUser}/>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
