/* eslint-disable */
export const userContentToFirebase = jest.fn()

export const getUserContent = jest.fn()
  .mockImplementationOnce(() => ({
    val: jest.fn().mockImplementation(() => {})
  }))
  .mockImplementation(() => ({
    val: jest.fn().mockImplementation(() => ({
      savedGenres: ['ska', 'rock'],
      savedSeeds: [
        {spm: 148, genre:'ska'}, 
        {spm: 160, genre:'rock'}
      ],
      savedSpms: [148, 160]
    }))
  }))

export const seedToFirebase = jest.fn()

export const deleteFirebaseSeed = jest.fn()
