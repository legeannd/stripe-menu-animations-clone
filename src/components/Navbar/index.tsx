import React from 'react';

import { Products, Developers, Company } from '../Content';
import { DropdownOption, DropdownProvider } from '../Dropdown';
import { Container, DropdownStyles } from './styles';

const Navbar: React.FC = () => {
  return (
    <DropdownProvider>
      <DropdownStyles>
        <Container>
          <ul>
            <li>
              <DropdownOption
                name="Produtos"
                content={Products}
              />
            </li>
            <li>
              <DropdownOption
                name="Desenvolvedores"
                content={Developers}
              />
            </li>
            <li>
              <DropdownOption
                name="Empresa"
                content={Company}
              />
            </li>
          </ul>
        </Container>
      </DropdownStyles>
    </DropdownProvider>
  );
};

export default Navbar;
