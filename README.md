# study-web-application

배운 것을 토대로 만들어보는 사용자의 공부를 위한 웹 어플리케이션

# react-hot-loader & webpack-dev-server

webpack-dev-server에서 내부적으로 app.js를 만드는 모양
./dist/app.js를 뺴고 하자.

# createContext typescript

1. default context

```tsx
    interface TableContextProps {
        tableData: string[][];
        dispatch: ({type}:{type:string}) => void;
    }
    export const TableContext  = createContext({} as TableContextProps);
    //...
    const [state, dispatch] = useReducer(reducer, initalState);
    const { calendarTable } = state;

    const value = useMemo(() => {
        tableData: tableData,
        dispatch: dispatch,
    },[tableData]):
```

2. JSX.Element 타입
   React Component의 타입은 아마... JSX.Element인 것 같다.

3. 컴포넌트 중복
   기본적으로 Functional Component(FC)에는 children props를 가지고 있다. 하지만 FC는 문제점이 있고
   되도록 지양하자.
   컴포넌트를 중복하고 싶은 경우에는 props에 children을 만들어서 넣자.

```jsx
type TrProps = {
	children: JSX.Element | JSX.Element[]
};
const Tr = ({ children }: TrProps) => {
	return <tr>{children}</tr>;
};
```
