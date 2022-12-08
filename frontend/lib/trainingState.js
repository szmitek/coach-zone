import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function TrainingStateProvider({children}) {
    // This is custom provider. It will store data (state) and functionality (updates)
    // in here and anyone can access it via the consumer

    const [trainingOpen, setTrainingOpen] = useState(false);

    function toggleTraining() {
        setTrainingOpen(!trainingOpen);
    }

    function closeTraining() {
        setTrainingOpen(false);
    }
    function openTraining() {
        setTrainingOpen(true);
    }

    return <LocalStateProvider value={{ 
        trainingOpen, 
        setTrainingOpen, 
        toggleTraining, 
        closeTraining, 
        openTraining 
    }}>{children}</LocalStateProvider>
}

//make a custom hook for accessing the trainig local state

function useTraining() {
    const all = useContext(LocalStateContext);
    return all;
}

export {TrainingStateProvider, useTraining};