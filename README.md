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
