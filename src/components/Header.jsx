import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import { Icon } from '@iconify/react';
import { logout } from '../services/api';
import toast from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();
 const handleLogout = async() =>{
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/logout")
    } catch (error) {
      toast.error("Something went wrong!")
    }

  }

  return (
    <Navbar isBordered maxWidth="xl">
    <Link to="/dashboard/citizen">
        <NavbarBrand>
          <Icon icon="lucide:shield-alert" className="text-primary text-2xl mr-2" />
          <p className="font-bold text-inherit">Crime Report System</p>
        </NavbarBrand>
        </Link>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button 
              isIconOnly 
              variant="light" 
              aria-label="Logout"
              onPress={handleLogout}
            >
              <Icon icon="lucide:log-out" className="text-lg" />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
  )
}

export default Header
