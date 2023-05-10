import './App.scss'

import Button from './components/button/button.component'
import Card from './components/card/card.component'
import Carousel from './components/carousel/carousel.component'
import ColorTheme from './components/color-theme/color-theme.component'

const cards = [
    <Card frontTitle='Card One' colorFront='primary' colorBack='secondary' />,
    <Card frontTitle='Card Two' colorFront='primary' colorBack='secondary' />,
    <Card frontTitle='Card Three' colorFront='primary' colorBack='secondary' />,
    <Card frontTitle='Card Four' colorFront='primary' colorBack='secondary' />,
    <Card frontTitle='Card Five' colorFront='primary' colorBack='secondary' />
]

const colors = {
    primary: '#0F7173',
    secondary: '#EF8354',
    tertiary: '#EE4B6A'
}

function App() {
    return (
        <ColorTheme colors={colors}>
            <div className="App">
                <section className='component-section'>
                    <h1>Button</h1>
                    <Button onClick={() => console.log('HI!')} color='tertiary' size='large'>Click Here</Button>
                </section>
                <section className='component-section'>
                    <h1>Card</h1>
                    <Card
                        frontTitle='Front Title'
                        frontText='This is in the front. How are you doing! Text goes here.'
                        backTitle='Back Title'
                        backText='This is in the back. More text goes here.'
                        colorFront='primary'
                        colorBack='secondary'
                    />
                </section>
                <section className='component-section'>
                    <h1>Carousel</h1>
                    <h2>Carousel: One Item</h2>
                    <Carousel items={cards} color='tertiary' itemPadding={64} />
                    <h2>Carousel: Multiple Items</h2>
                    <Carousel items={cards} prev next color='tertiary' />
                </section>
            </div>
        </ColorTheme>
    )
}

export default App
