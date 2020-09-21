import React from 'react';

import { DropdownOption } from '../DropdownOption';

import { Container } from './styles';

const Navbar: React.FC = () => {
  return (
    <Container>
      <ul>
        <li>
          <DropdownOption
            name="Produtos"
            content={() => <h1>Produtos</h1>}
          />
        </li>
        <li>
          <DropdownOption
            name="Desenvolvedores"
            content={() => <h1>Desenvolvedores</h1>}
          />
        </li>
        <li>
          <DropdownOption
            name="Empresa"
            content={() => <h1>Empresa</h1>}
          />
        </li>
      </ul>
    </Container>
  );
};

export default Navbar;
