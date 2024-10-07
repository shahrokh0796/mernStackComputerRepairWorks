import { useState, useEffect, useMemo} from 'react';

const usePersist = () => {
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false);
    useEffect(() => {
        localStorage.setItem('persist', JSON.stringify(persist));
    }, [persist]);

    return useMemo(() => [persist, setPersist], [persist]);
}

export default usePersist;

