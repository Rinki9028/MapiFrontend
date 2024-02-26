import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { Menu, MenuItem } from "@material-ui/core";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const Topheader = React.lazy(() => import("./Topheader"));

const drawerWidth = 200;

const navItems = [
  { text: "Home", path: "/" },
  {
    text: "Services",
    subItems: [
      { text: "Event Planning", path: "/eventplanning" },
      { text: "Design and Decor", path: "/designanddecor" },
      { text: "Vendor Coordination", path: "/vendorcoordination" },
      { text: "Logistics", path: "/logistics" },
    ],
  },
  { text: "See Our Work", path: "/seeourwork" },
  { text: "Blogs", path: "/blogs" },
  { text: "Contact Us", path: "/contact" },
  { text: "For Employee", path: "/login" },
];

function Subheader(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [subMenuAnchor, setSubMenuAnchor] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [logoSize, setLogoSize] = useState(80);

  const [servicesOpen, setServicesOpen] = useState(false);
  const handleOpenSubMenu = (event, subItem) => {

    setSubMenuAnchor(event.currentTarget);
    setActiveSubMenu(subItem);
  };

  const handleCloseSubMenu = () => {
    setSubMenuAnchor(null);
    setActiveSubMenu(null);
  };

  const toggleServices = () => {
    setServicesOpen((prevState) => !prevState);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const newSize = 80 - scrollY;
    setLogoSize(Math.max(newSize, 0.01));
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img src="/images/WH_Logo.jpeg" alt="logo" width="80px" />
      <Divider />
      <List>
        {navItems?.map((item) => (
          <ListItem key={item.text} disablePadding>
            {item.text === "Services" ? (
              <ListItemButton
                sx={{ textAlign: "center" }}
                onMouseOver={(event) => handleOpenSubMenu(event, item)}
                onMouseOut={handleCloseSubMenu}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            ) : (
              <ListItemButton sx={{ textAlign: "center" }}>
                <Link
                  to={item.path}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemText primary={item.text} />
                </Link>
              </ListItemButton>
            )}
            {item.text === "Services" && servicesOpen && (
              <List sx={{ backgroundColor: "orange", marginTop: "20%" }}>
                {item.subItems?.map((subItem) => (
                  <ListItem key={subItem.text}>
                    <Link
                      to={subItem.path}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItemText primary={subItem.text} />
                    </Link>
                  </ListItem>
                ))}
              </List>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ backgroundColor: "white" }}>
          <Topheader />
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon style={{ color: "black" }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <img
                src="/images/WH_Logo.jpeg"
                alt="logo"
                width={`${logoSize}px`}
                style={{
                  transition: "width 0.3s ease",
                  marginRight: "auto",
                }}
              />
            </Typography>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems?.map((item) => (
                <div style={{ display: "inline-block" }}>
                  {item.subItems ? (
                    <div
                      onMouseOver={(event) => handleOpenSubMenu(event, item)}
                      onMouseOut={handleCloseSubMenu}
                    >
                      <Button
                        sx={{
                          color: "black",
                          display: "block",
                          cursor: "pointer",
                        }}
                      >
                        {item.text}
                      </Button>
                      <Menu
                        anchorEl={subMenuAnchor}
                        open={activeSubMenu === item}
                        onClose={handleCloseSubMenu}
                      >
                        {item.subItems?.map((subItem) => (
                          <MenuItem
                            key={subItem.text}
                            component={Link}
                            to={subItem.path}
                            onClick={handleCloseSubMenu}
                          >
                            {subItem.text}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      component={Link}
                      to={item.path}
                      sx={{
                        color: "black",
                        display: "block",
                      }}
                    >
                      {item.text}
                    </Button>
                  )}
                </div>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 8 }}></Box>
      </Box>
    </>
  );
}

Subheader.propTypes = {
  window: PropTypes.func,
};

export default Subheader;
