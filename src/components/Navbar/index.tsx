import React from 'react';

import { Products, Developers, Company } from '../Content';
import { DropdownOption, DropdownProvider, DropdownRoot } from '../Dropdown';
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
                backgroundHeight={10}
              />
            </li>
            <li>
              <DropdownOption
                name="Desenvolvedores"
                content={Developers}
                backgroundHeight={10}
              />
            </li>
            <li>
              <DropdownOption
                name="Empresa"
                content={Company}
                backgroundHeight={10}
              />
            </li>
          </ul>
        </Container>

        <DropdownRoot />
      </DropdownStyles>
    </DropdownProvider>
  );
};

export default Navbar;
