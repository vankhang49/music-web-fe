import { Input, useElementPosition } from "lvq";
import { useEffect, useState } from "react";

const InputSearchHome = ({ ref, onValueChange, onPositionChange }) => {
    const { position: positionInputSearch, elementRef: elementRefInputSearch } = useElementPosition();
    const [searchTerm, setSearchTerm] = useState(null);
    const [isSearchActive, setSearchActive] = useState(false);
    
    useEffect(() => {
        if (onPositionChange) {
            onPositionChange(positionInputSearch);
        }
    }, [positionInputSearch, onPositionChange]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        onValueChange(value);
    };

    return (
        <Input 
            ref={elementRefInputSearch} 
            theme="search_2" 
            className="search-home" 
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..." 
            gd={{ maxWidth: "500px" }} 
            id="search_bar_active_modal" 
        />
    )
}

export default InputSearchHome;
