import { Component } from "react";
import '@/static/carousel.css'

type CarouselProps = {
    images: string[];
}

type CarouselState = {
    activeIndex: number;
}

export default class Carousel extends Component<CarouselProps, CarouselState> {
    state = {
        activeIndex: 0
    }

    incrementIndex = () => {
        if (this.state.activeIndex >= this.props.images.length - 1) {
            this.setState({activeIndex: 0})
        } else {
            this.setState({activeIndex: this.state.activeIndex + 1})
        }
    }

    decrementIndex = () => {
        if (this.state.activeIndex <= 0) {
            this.setState({activeIndex: this.props.images.length - 1})
        } else {
            this.setState({activeIndex: this.state.activeIndex - 1})
        }
    }

    render () {
        return (
            <div className="carousel flex-center gap-y-6 flex-col lg:justify-normal lg:items-start lg:flex-row">
                <div className="carousel-images flex-row flex-wrap lg:flex-col gap-x-4">
                    {
                        this.props.images.map((image, index) => {
                            return (
                                <button className="carousel-image-wrapper" key={index} onClick={() => this.setState({activeIndex: index})}>
                                    <img src={image} alt={`product-${index}`} className="carousel-image"/>
                                </button>
                            )
                        })
                    }
                </div>
                <div className="active-image lg:mx-4 relative">
                    <button className="index-button top-1/2 left-4" onClick={this.decrementIndex}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.9687 5.16618L7.53955 12.5875L14.9687 20.0088" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button className="index-button top-1/2 right-4" onClick={this.incrementIndex}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5.09158L16.5 12.5836L9 20.0757" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <img src={this.props.images[this.state.activeIndex]} alt="active-image"/>
                </div>
            </div>
        )
    }
}