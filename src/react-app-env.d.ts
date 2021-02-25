/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
        REACT_APP_SUBMIT_NP: string
        REACT_APP_SUBMIT_FU: string
        REACT_APP_AVAILABILITY: string
        }
    }
    interface Window {
        Stripe: any
    }