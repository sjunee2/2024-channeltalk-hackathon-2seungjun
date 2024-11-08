import { Select } from '@mantine/core';
import { useFilterStore } from '../../store/filter';
import styled from 'styled-components';
import './select.css';

const Filter = () => {

  const { setStatus, setRole, setAssignUser } = useFilterStore();

  return (
    <Wrapper>
      <Select
        label="status"
        placeholder="status"
        data={['none', 'proposal', 'progress', 'done']}
        defaultValue={'none'}
        searchable
        nothingFoundMessage="Nothing found..."
        onChange = {(value) => value !== null && setStatus(value)}
      />
      <Select
        label="role"
        placeholder="role"
        data={['none', 'owner', 'member']}
        defaultValue={'none'}
        searchable
        nothingFoundMessage="Nothing found..."
        onChange = {(value) => value !== null && setRole(value)}
      />
      <Select
        label="assignUser"
        placeholder="assignUser"
        data={['none', '123', '124']}
        defaultValue={'none'}
        searchable
        nothingFoundMessage="Nothing found..."
        onChange = {(value) => value !== null && setAssignUser(value)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
display: flex;
flex-direction: row;
gap: 16px;
`;


export default Filter;