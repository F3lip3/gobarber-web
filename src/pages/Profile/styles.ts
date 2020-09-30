import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;

    > div {
      max-width: 1120px;
      width: 100%;
      margin: 0 auto;

      svg {
        color: #999591;
        height: 24px;
        width: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  margin: -175px auto 0;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 16px;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const Avatar = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #ff9000;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease-in-out;

    svg {
      height: 20px;
      width: 20px;
      color: #312e38;
    }

    input {
      display: none;
    }

    &:hover {
      background-color: ${shade(0.2, '#ff9000')};
    }
  }
`;
