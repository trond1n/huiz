import React, { useState } from "react";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import classes from "./Layout.module.css";

const Layout = (props) => {
  const [menu, setMenu] = useState(false);
  const toggleMenuHandler = () => {
    setMenu(!menu);
  };
  const menuCloseHandler = () => {
    setMenu(false);
  };

  return (
    <div className={classes.Layout}>
      <Drawer isOpen={menu} onClose={menuCloseHandler} />
      <MenuToggle onToggle={toggleMenuHandler} isOpen={menu} />
      <main>{props.children}</main>
    </div>
  );
};
export default Layout;
