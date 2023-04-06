import { LightningElement, wire } from 'lwc';
import { reduceErrors } from 'c/ldsUtils';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import searchAccounts from '@salesforce/apex/AccountController.searchAccounts';
const COLUMNS = [
    { label: 'Account Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Industry', fieldName: INDUSTRY_FIELD.fieldApiName, type: 'text' },
    { label: 'Rating', fieldName: RATING_FIELD.fieldApiName, type: 'number' },
];

export default class AccountsList extends LightningElement {
    columns = COLUMNS;
    @wire(searchAccounts, {searchTerm: '$searchTerm'})
    accounts;

    	handleSearchTermChange(event) {
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;

		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.accounts.data.length > 0);
	}



    get errors() {
        return (this.accounts.error) ?
            reduceErrors(this.accounts.error) : [];
    }
}