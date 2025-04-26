import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import { Icon } from '@iconify/react';

const Header = () => {
  return (
    <Navbar isBordered maxWidth="xl">
        <NavbarBrand>
          <Icon icon="lucide:shield-alert" className="text-primary text-2xl mr-2" />
          <p className="font-bold text-inherit">Crime Report System</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button 
              isIconOnly 
              variant="light" 
              aria-label="Logout"
              onPress={() => console.log("Logout clicked")}
            >
              <Icon icon="lucide:log-out" className="text-lg" />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
  )
}

export default Header
