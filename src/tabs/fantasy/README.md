```
initialState = {
    page: '/about'
};
function handleClick(event, page) {
    event.preventDefault();
    setState({ page: event.target.getAttribute('href') });
}
<div>

<Tabs>
    <TabItem url='/about' onClick={ handleClick } checked={ state.page === '/about' }>
        О кредите
    </TabItem>
    <TabItem url='/graph' onClick={ handleClick } checked={ state.page === '/graph' }>
        График платежей
    </TabItem>
    <TabItem url='/details' onClick={ handleClick } checked={ state.page === '/details' }>
        Реквизиты
    </TabItem>
</Tabs>

</div>
```
