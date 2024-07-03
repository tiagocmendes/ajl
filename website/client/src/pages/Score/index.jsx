import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { routes } from '../../routes';

import {
  StyledResultsContainer,
  StyledSubheader,
  StyledSubheaderOption,
  StyledBody,
} from './style';
import Groups from './Groups';
import Knockouts from './Knockouts';

const VIEWS = {
  GROUPS: 'Grupos',
  KNOCKOUT: 'Eliminatórias',
};

const Score = () => {
  const [selectedView, setSelectedView] = useState(VIEWS.GROUPS);
  const [groupsScoreboard, setGroupsScoreboard] = useState([]);

  useEffect(() => {
    const fetchGroupsScoreboard = async () => {
      try {
        const response = await axios.get(routes.groupsScoreboard);
        setGroupsScoreboard(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroupsScoreboard();
  }, []);

  return (
    <StyledResultsContainer>
      <StyledSubheader>
        {Object.values(VIEWS).map((view) => (
          <StyledSubheaderOption
            isSelected={view === selectedView}
            onClick={() => setSelectedView(view)}
          >
            {view}
          </StyledSubheaderOption>
        ))}
      </StyledSubheader>
      <StyledBody>
        {selectedView === VIEWS.GROUPS && <Groups groups={groupsScoreboard} />}
        {selectedView === VIEWS.KNOCKOUT && <Knockouts />}
      </StyledBody>
    </StyledResultsContainer>
  );
};

export default Score;
