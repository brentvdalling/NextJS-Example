import React, {useState} from 'react'
import { makeObservable, observable, computed, action } from "mobx"
import Link from 'next/link'

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }
    }

    setIsOpen(state) {
        this.setState({
            isOpen: state
        })
    }

    componentDidMount() {
        this.setState({
            isOpen: screen.width > 499
        });
    }

    render() { 
        return (
        <div className="flex flex-row flex-wrap">
            <div className="flex flex-row flex-wrap p-5 bg-white shadow-sm md:shadow-lg navbar content-start relative">
                <div className="w-30 md:w-full md:p-3">
                    <a className="w-full pointer-cursor text-indigo-500 text-4xl hover:text-gray-600" href="/">Pexlr</a>
                </div>
                {this.state.isOpen ? (<div className="md:mt-0 mt-5 flex flex-col flex-wrap items-start text-gray-500 text-xl w-full">
                    <a className="w-full p-3 pointer-cursor hover:text-gray-600 md:border-t" href="/">Home</a>
                    <a className="w-full p-3 pointer-cursor hover:text-gray-600 md:border-t" href="/about">About</a>
                    <a className="w-full p-3 pointer-cursor hover:text-gray-600 md:border-t md:border-b" href="/contact">Contact Us</a>
                </div>) : ''}
                <div className="flex md:hidden flex-col flex-wrap content-end mr-5 mt-1 right-0 absolute">
                    <button className="text-3xl text-gray-600" onClick={() => this.setIsOpen(!this.state.isOpen)}><i className="fa fa-bars"/></button>
                </div>
            </div>
        </div>
        );
    }
}

export default Navbar;