import React, { createContext } from 'react'

const ApplicationContext = createContext()

export const ApplicationProvider = ApplicationContext.Provider

export const ApplicationConsumer = ApplicationContext.Consumer

export default ApplicationContext