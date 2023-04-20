interface Props {
    items: any[],
    currentIndex: number
}

const OneItem: React.FC<Props> = ({ items, currentIndex }) => (
    <div className='item'>
        {items[currentIndex]}
    </div>
);
export default OneItem;