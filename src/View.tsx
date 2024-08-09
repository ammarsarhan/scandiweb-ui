import '@/static/index.css';

import { Component } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router-dom' 

import Category from "@/views/Category";
import Details from "@/views/Details";

class View extends Component<RouteComponentProps> {
  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      console.log(`Route changed from ${prevProps.location.pathname} to ${this.props.location.pathname}`);

      const links = document.querySelectorAll('a.link');
      links.forEach(link => {
        const match = link.getAttribute("href") === this.props.location.pathname;
        match ? link.setAttribute("data-testid", "active-category-link") : link.setAttribute("data-testid", "category-link");
      })
    }
  }

  render () {
    return (
      // Setting up routing with react-router-dom@5.3.3
      // to ensure ONLY class-based components across project as per spec
      // v6 would not allow us to useParams()
      <Switch>
        <Route exact path="/">
          <Category variant='all'/>
        </Route>
        <Route exact path="/clothes">
          <Category variant='clothes'/>
        </Route>
        <Route exact path="/tech">
          <Category variant='tech'/>
        </Route>
        <Route exact path="/product/:id" component={Details}/>
        {/* Handle 404 */}
        <Route path="*">
          <div className='h-[80vh] flex-center'>
            <img src="https://cdn.svgator.com/images/2024/04/detective-animation-404-error-page.gif" alt="404 Not Found" className='h-1/2 w-full object-contain'/>
          </div>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(View);