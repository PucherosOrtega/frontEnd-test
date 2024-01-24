import { Reducer, createContext } from "react"

interface AuthTheme {
    id: number,
    userName: string,
    role: string,
    isAuth: false,
}

const THEME = createContext<AuthTheme>({
    id: 0,
    userName: '',
    role: '',
    isAuth: false
})

type AuthAction = | { type: 'LOGIN'; user: AuthTheme }
| { type: 'LOGOUT' };

// const authReducer: Reducer<AuthTheme, AuthAction> = (
//   state,
//   action
// ) => {
//   switch(action.type){
//     case 'LOGIN':
//       return {
//         ...state,
//         isAuth: true
//       }
//     case 'LOGOUT':
//       return {
//         ...state,
//         isAuth: false
//       }
//   }
// }

export const ThemeContext = () => {
  return (
    <div>ThemeContext</div>
  )
}
