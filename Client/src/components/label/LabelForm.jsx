import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import Label from './Label';
import { LabelContext } from '../../stores/LabelStore';
import { getRandomColor, isValidColor } from '../../utils/color';

import { POST_LABEL } from '../../utils/api';
import { postOptions } from '../../utils/fetchOptions';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ebecef;
  background: #f6f8fa;
  padding: 10px;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 5px;
`;

const ColorBox = styled.button`
  background: ${(props) => props.color};
  width: 30px;
  border-radius: 3px;
  border: 1px solid #bbbbbb;
  margin-right: 4px;
`;

const InputContainer = styled.div`
  flex: ${(props) => props.flex};
  display: flex;
  flex-direction: column;
  padding-right: 5px;
`;

const InputContent = styled.div`
  display: flex;
`;

const InputTitle = styled.p`
  font-weight: bold;
  font-size: 12px;
`;

const Input = styled.input`
  height: 24px;
  width: ${(props) => props.width || '100%'};
  border-radius: 3px;
  border: 1px solid #bbbbbb;
  padding-left: 10px;
`;

const SubmitButton = styled.button`
  height: 28px;
  color: white;
  box-shadow: 0px 1px 0px 0px #3dc21b;
  background: linear-gradient(to bottom, #44c767 5%, #5cbf2a 100%);
  background-color: '#44c767';
  border-radius: 3px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  text-shadow: 0px -1px 0px #2f6627;
  padding: 5px 10px;
`;

const CancelButton = styled.button`
  height: 28px;
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: linear-gradient(to bottom, #f9f9f9 5%, #e9e9e9 100%);
  background-color: #f9f9f9;
  border-radius: 3px;
  border: 1px solid #bbbbbb;
  display: inline-block;
  cursor: pointer;
  color: #666666;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 10px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
  margin-left: 20px;
  margin-right: 5px;
`;

const ReloadIcon = styled.img`
  display: flex;
  align-items: center;
`;

const LabelForm = ({ initName, initDescription, initColor }) => {
  const { labelDispatch, newDispatch } = useContext(LabelContext);

  if (!initColor) {
    initColor = getRandomColor();
  }

  const nameRef = useRef(false);
  const descriptionRef = useRef(false);
  const colorRef = useRef(false);
  const [name, setName] = useState(initName);
  const [description, setDescription] = useState(initDescription);
  const [color, setColor] = useState(initColor);

  const changeRandomColor = () => {
    const newColor = getRandomColor();
    setColor(newColor);
  };

  const colorInputChange = (e) => {
    setColor(colorRef.current.value);
  };

  const descriptionInputChange = (e) => {
    setDescription(descriptionRef.current.value);
  };

  const nameInputChange = (e) => {
    setName(nameRef.current.value);
  };

  const createCancel = (e) => {
    newDispatch({ type: 'NEW_LABEL_TAB_CLOSE' });
  };

  const createNewLabel = async (e) => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const color = colorRef.current.value;

    if (name === '') {
      alert('이름을 작성해주세요.');
      return false;
    }
    if (!isValidColor(color)) {
      alert('유효하지 않은 색상 값입니다.');
      return false;
    }

    const label = {
      name: name,
      description: description,
      color: color,
    };
    const options = postOptions(label);
    const response = await fetch(POST_LABEL, options);
    const result = await response.json();

    const id = result.data.insertId;
    label.id = id;

    newDispatch({ type: 'NEW_LABEL_TAB_CLOSE' });
    labelDispatch({ type: 'NEW_LABEL_ADD', payload: label });
  };

  return (
    <Form>
      <FormContainer>
        <Label color={color} name={name !== '' ? name : 'Label preview'} />
      </FormContainer>
      <FormContainer>
        <InputContainer>
          <InputTitle>Label Name</InputTitle>
          <InputContent>
            <Input
              placeholder="Label name"
              value={name}
              ref={nameRef}
              onChange={nameInputChange}
            />
          </InputContent>
        </InputContainer>
        <InputContainer flex="1">
          <InputTitle>Description</InputTitle>
          <InputContent>
            <Input
              placeholder="Description (optional)"
              value={description}
              ref={descriptionRef}
              onChange={descriptionInputChange}
            />
          </InputContent>
        </InputContainer>
        <InputContainer>
          <InputTitle>Color</InputTitle>
          <InputContent>
            <ColorBox color={color} onClick={changeRandomColor}>
              <ReloadIcon src="/images/reload.svg"></ReloadIcon>
            </ColorBox>
            <Input
              placeholder="color"
              width="60px"
              value={color}
              ref={colorRef}
              onChange={colorInputChange}
            />
          </InputContent>
        </InputContainer>
        <InputContainer>
          <InputContent>
            <CancelButton onClick={createCancel}>Cancel</CancelButton>
            <SubmitButton onClick={createNewLabel}>Create labels</SubmitButton>
          </InputContent>
        </InputContainer>
      </FormContainer>
    </Form>
  );
};

export default LabelForm;
