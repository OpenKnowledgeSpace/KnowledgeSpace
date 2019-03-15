import React, {  Component } from 'react';
import PropTypes from 'prop-types'; 
import ReactDOM from 'react-dom';
import * as _ from 'lodash';
 
const propTypes = {
    items: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number
}
 
const defaultProps = {
    initialPage: 1
}

// http://jasonwatmore.com/post/2017/03/14/react-pagination-example-with-logic-like-google 
class Pagination extends Component {
    
		constructor(props) {
        super(props);
        this.state = { pager: {} };
    }
 
    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }
 
    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }
 
    setPage(page) {
        var numberOfItems = this.props.items;
        var pager = this.state.pager;
 
        if (page < 1 || page > pager.totalPages) {
            return;
        }
 
        // get new pager object for specified page
        pager = this.getPager(numberOfItems, page);
 
        // update state
        this.setState({ pager: pager });
 
        // call change page function in parent component
        this.props.onChangePage(page);
    }
 
    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
 
        // default page size is 20
        pageSize = pageSize || 20;
 
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
 
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
 
    render() {
        var pager = this.state.pager;
 
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
 
        return (
            <ul className="pagination card-pagination">
                <li className={pager.currentPage === 1 ? 'disabled' : 'waves-effect'}>
                    <a onClick={() => this.setPage(1)}><i className='material-icons'>first_page</i></a>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : 'waves-effect'}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)}><i className='material-icons'>chevron_left</i></a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : 'waves-effect'}>
                        <a onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : 'waves-effect'}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)}><i className='material-icons'>chevron_right</i></a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : 'waves-effect'}>
                    <a onClick={() => this.setPage(pager.totalPages)}><i className='material-icons'>last_page</i></a>
                </li>
            </ul>
        );
    }
}
 
Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
