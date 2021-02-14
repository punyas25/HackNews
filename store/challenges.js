import { createSlice } from '@reduxjs/toolkit'

const challengeSlice = createSlice({
    name: 'challenge',
    initialState: {
        challenges: [],
        challengeCount: 0,
        challenge: {}
    },
    reducers: {
      getAllChallenges(state, action) {
        const challengeData = action.payload
        state.challenges = challengeData
        state.challengesCount = challengeData.length
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
      }
    },
    extraReducers: {}
})

export const { getAllChallenges, getChallenge } = challengeSlice.actions

export default challengeSlice.reducer
