import './App.scss'

import Button from './components/button/button.component'
import Card from './components/card/card.component'
import Carousel from './components/carousel/carousel.component'
import ColorTheme from './components/color-theme/color-theme.component'
import Parallax from './components/parallax/parallax'

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
                <section className='parallax-section'>
                    <Parallax
                        backgroundPath='https://images.unsplash.com/photo-1695037150815-bad631c344b3?auto=format&fit=crop&q=80&w=3175&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        speed={.5}
                    >
                        <div className='content'>
                            <h1>Parallax Section</h1>
                            <p>This text should move at a different speed than the background</p>
                            <p>This is more text</p>
                            <p>Hello there!</p>
                            <p>Still more.</p>
                            <p>The end!</p>
                        </div>
                    </Parallax>
                </section>
                <section style={{ width: '100%', height: '1000px' }}></section> { /* This section is here so there is more room to scroll to display the whole parallax effect in .parallax-section */}
            </div>
        </ColorTheme>
    )
}

export default App
