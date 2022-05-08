import Backdrop from '@mui/material/Backdrop';
import Login from './Login'

export default function LoginBackdrop({open, handleToggle, setUser}) {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Login handleToggle={handleToggle} setUser={setUser}/>
      </Backdrop>
    </div>
  );
}
