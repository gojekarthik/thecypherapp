"use client"

import { atom, AtomOptions, RecoilState } from "recoil";

export const signUpInputsAtom = atom({
    key: 'signInInputsAtom', // unique ID (with respect to other atoms/selectors)
    default: {
        email: "" ,
        password:"",
        name:""
    }, // default value (aka initial value)
  });

export const userDetailsAtom  = atom({
    key: "userDetails",
    default: {
        email:"john@email.com" || null || undefined,
        image:"#" || null || undefined,
        name:"John Doe" || null || undefined
    }
})
