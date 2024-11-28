export const TimeExtractor = ({ dateTime }) => {
    // Tạo đối tượng Date từ chuỗi ngày giờ
    const date = new Date(dateTime);

    // Lấy giờ và phút
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Định dạng giờ và phút
    const formattedTime = `${hours}:${minutes}`;

    return (
        <div>{formattedTime}</div>
    );
};