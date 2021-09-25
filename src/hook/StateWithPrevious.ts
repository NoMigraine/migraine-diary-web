import { useState, useRef, useEffect } from "react";

export default function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const [val, valSetter] = useState(value)
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
        ref.current = val;
    }, [val]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return [val, valSetter, ref.current];
}