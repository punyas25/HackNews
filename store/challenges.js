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
      }
    },
    extraReducers: {}
})

export const { getAllTags, getAllChallenges, getChallenge, addChallenge } = challengeSlice.actions

export default challengeSlice.reducer
