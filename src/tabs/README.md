```jsx
import TabItem from 'arui-feather/tab-item';

initialState = {
    page: '/about'
};
function handleClick(event) {
    event.preventDefault();
    setState({ page: event.target.getAttribute('href') });
}
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
```
