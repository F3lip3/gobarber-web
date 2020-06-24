import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  color: #636660;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #636660;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: #f4ede8;
      -webkit-box-shadow: 0 0 0px 1000px #242129 inset;
      box-shadow: 0 0 0px 1000px #242129 inset;
    }
  }

  > svg {
    margin-right: 16px;
  }
`;
