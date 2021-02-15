import { createSlice } from '@reduxjs/toolkit'

const challengeSlice = createSlice({
    name: 'challenge',
    initialState: {
      challenges: [],
      challengesCount: 0,
      challenge: {},
      tags: []
    },
    reducers: {
      getAllTags(state, action) {
        const tagsData = action.payload
        state.tags = tagsData
      },
      getAllChallenges(state, action) {
        try {
          const challengeData = localStorage.getItem('challenges');
          if (challengeData === null) {
            return undefined;
          }
          state.challenges = JSON.parse(challengeData)
          state.challengesCount = JSON.parse(challengeData).length
        } catch (err) {
          return undefined;
        }
      },
      getChallenge(state, action) {
        const data = action.payload
        let challengeData = {}

        state.challenges.forEach(emp => {
          if (emp['id'] == data.challenge_id) {
            challengeData = emp
          }
        })
        state.challenge = challengeData
      },
      addChallenge(state, action) {
        const data = action.payload
        let challengeList= state.challenges
        challengeList.push(data)
        localStorage.setItem('challenges', JSON.stringify(challengeList));
        state.challenge  = data
      },
      updateVotes(state, action) {
        const id = action.payload
        let challengeList = [...state.challenges]
        let currentChallenge = {...challengeList[id]}
        let votes = currentChallenge['votes']
        votes++
        currentChallenge['votes'] = votes
        challengeList[id] = currentChallenge
        localStorage.setItem('challenges', JSON.stringify(challengeList));
        state.challenges = challengeList
      },
      sortChallenges(state, action) {
        let data = action.payload
        console.log(data);
        let sortOrder = data.sort
        let sortCategory = data.type

        let challengeList = [...state.challenges]
        console.log(challengeList);

        if (sortOrder == 'Ascending') {
          if (sortCategory == 'date') {
            challengeList.sort(function compare(a, b) {
              let dateA = new Date(a.created_at);
              let dateB = new Date(b.created_at);
              return dateA - dateB;
            });
          } else {
            challengeList.sort((a, b) => parseFloat(a.votes) - parseFloat(b.votes));
          }
        } else {
          if (sortCategory == 'date') {
            challengeList.sort(function compare(a, b) {
              let dateA = new Date(a.created_at);
              let dateB = new Date(b.created_at);
              return dateB - dateA;
            });
          } else {
            challengeList.sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes));
          }
        }
        console.log(challengeList);

        localStorage.setItem('challenges', JSON.stringify(challengeList));
        state.challenges = challengeList
      }
    },
    extraReducers: {}
})

export const { getAllTags, getAllChallenges, getChallenge, addChallenge, updateVotes, sortChallenges } = challengeSlice.actions

export default challengeSlice.reducer
