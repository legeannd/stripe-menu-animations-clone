import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(150deg, #53f 15%, #05d5ff );

  > ul {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 21px;
  }
`;

export const DropdownStyles = styled.div`
  .dropdown-option {
    padding: 20px 25px;
    outline: 0;
    color: #fff;
    font-size: 18px;

    transition: opacity 0.2s;

    &:hover, &:focus {
      opacity: .55;
    }
  }

  .dropdown-root {
    z-index: 10;
    position: absolute;
  }

  .dropdown-arrow {
  
  }

  .dropdown-container {
    position: absolute;
  }

  .dropdown-section {
    position: absolute;
  }
`;