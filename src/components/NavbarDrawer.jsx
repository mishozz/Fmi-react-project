import {
    Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {Avatar} from "@material-ui/core";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginBackdrop from './LoginBackdrop'

const useStyles = makeStyles(()=>({
    link:{
        textDecoration:"none",
        color: "blue",
        fontSize: "20px",
    },
    icon:{
        color: "white"
    }
}));

function NavbarDrawer({openDrawer, openLoginBackdrop, handleDrawer, handleLoginBackdrop, setUser,user, logout}) {
  const classes = useStyles();


  return (
    <>
    <div>
      {openLoginBackdrop ? (
        <div>
          <LoginBackdrop open={openLoginBackdrop} handleToggle={handleLoginBackdrop} setUser={setUser}/>
        </div>
      ): (
        <div>
          <Drawer
          open={openDrawer}
          onClose={handleDrawer}
          anchor="left"
          >
          <List>
            { !user &&
              <ListItem >
                <Avatar onClick={() => {
                  handleLoginBackdrop();
                  handleDrawer();
                }} ><AccountCircleIcon/></Avatar>
              </ListItem>
            }
            <Divider/>
            <ListItem onClick={ handleDrawer}>
                <ListItemText>
                  <Link to="/" className={classes.link}>Home</Link>
                </ListItemText>
              </ListItem>
            <Divider/>
            { user && (
              <>
                {user.role === "ADMIN" && 
                  <ListItem onClick={handleDrawer}>
                  <ListItemText>
                      <Link to="/admin" className={classes.link}>Admin panel</Link>
                    </ListItemText>
                  </ListItem>
                }
                <ListItem onClick={handleDrawer}>
                <ListItemText>
                    <Link to="/mybooks" className={classes.link}>My books</Link>
                  </ListItemText>
                </ListItem>
                <Divider/>
                <ListItem onClick={handleDrawer}>
                  <ListItemText>
                    <Link to="/" onClick={logout} className={classes.link}>Log out</Link>
                  </ListItemText>
                </ListItem>
              </>
            )}
            <Divider/>
          </List>
        </Drawer>
      </div>
      )}
      </div>
    </>
  );
}
export default NavbarDrawer;
