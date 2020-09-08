import React from 'react';
import AddTransaction from 'layouts/Pages/ManageFinances-Components/AddTransaction';
import TransactionsList from 'layouts/Pages/ManageFinances-Components/TransactionsList';
import ShowAddTransaction from 'layouts/Pages/ManageFinances-Components/ShowAddTransaction';

class ManageFinances extends React.Component {
    state = {
        transactions: [],
        activeAddTransaction: true,
        allFinances: [0],
        // slicedArray: []
    }
    counter = 0



    deleteTransaction = (idOfDeleteTranscition) => {

        let transactions = [...this.state.transactions];
        transactions = transactions.filter(transaction => transaction.id !== idOfDeleteTranscition)

        let allFinances = [...this.state.allFinances]
        allFinances = transactions.map(newValue => newValue.amount)


        this.setState({
            transactions,
            allFinances: [0, ...allFinances]
        });

    }


    addTransaction = (text, amount) => {
        const transaction = {
            id: this.counter,
            amount,
            text,
        }
        this.setState(prevState => ({
            transactions: [...prevState.transactions, transaction],
            activeAddTransaction: false,
            allFinances: [...prevState.allFinances, amount],
        }))

        this.counter++


    }




    handleShowAddTransaction = () => {
        this.setState({
            activeAddTransaction: !this.state.activeAddTransaction
        })
    }





    render() {

        return (
            <>
                <div className="manageFinances">
                    <TransactionsList transactions={this.state.transactions} allFinances={this.state.allFinances} deleteTransaction={this.deleteTransaction} />
                    <div className="controlsTransaction">
                        <ShowAddTransaction handleShowAddTransaction={this.handleShowAddTransaction} />
                        <button className="controlsTransaction__deleteAllFinances">Delete All Finances</button>
                    </div>
                    {this.state.activeAddTransaction && <AddTransaction addTransaction={this.addTransaction} />}
                </div>
            </>
        );
    }
}

export default ManageFinances;