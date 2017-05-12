export const globalStyles = {
    buttonPadder: {
        paddingTop: 10
    },
    scrollViewContainer: {
        flex: 1,
        backgroundColor: 'red'
    },
    container: {
        //backgroundColor: 'green',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        paddingTop: 40,
        paddingHorizontal: 10,
        flexGrow: 1
    },
    /*button: {
        
        width: 100,
        marginTop: 25,
        marginBottom: 25,
        paddingTop: 10
    },
    greenButton:{
        backgroundColor: 'green',
    },*/
    greenButton: {
        backgroundColor: 'green',
    },

    //a button container that floats on top of other page content
    floatingButtonContainer: {
        position: 'absolute', left: 0, right: 0, bottom: 0,
        /*flex: 1,
        justifyContent: 'flex-end',*/
        marginHorizontal: 20,
        paddingBottom: 25,
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
    // button container that sits at the bottom of the screen and presents a 
    // hard stop for content positioned vertically higher than it
    footerButtonContainer: {
        //backgroundColor: 'blue',
        justifyContent: 'flex-end',
        //backgroundColor:'rgba(52, 52, 52, 0.8)',
        marginHorizontal: 20,
        paddingBottom: 25,
        flexDirection: 'column',
        bottom: 0,
        alignSelf: 'stretch',

    },
    transparentButtonForMapContainer: {
        backgroundColor: 'blue',
        flexDirection: 'row',
        alignSelf: 'center',
        zIndex: 10,
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 10

    },

    transparentButtonForMap: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingVertical: 12,
        borderRadius: 20,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    button: {

    },
    iconButton: {
        borderRadius: 5,
        margin: 5,
        backgroundColor: 'dodgerblue',
        padding: 5,
        width: 25,
        height: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageEntryBox: {
        backgroundColor: 'moccasin',
        borderColor: 'darkkhaki',
        borderWidth: 1,
        padding: 10,
        flexGrow: 1
    },
    modalBackground:{
        flex: 1,
        flexGrow: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    modalOverlay:{
        flex: 1,
        justifyContent: `center`,
        alignItems: `center`,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        marginVertical: 100,
        marginHorizontal: 40,
        borderRadius: 15
    },
    modalMessageOverlay:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        marginVertical: 140,
        marginHorizontal: 40,
        borderRadius: 5,
        flexDirection: 'column',
        paddingHorizontal: 10,
        flexGrow: 1,
        padding: 15

    },
    modalMessageTitle:{
        fontSize:30,
        color:'white'
    },
    modalMessageText:{
        fontSize:22,
        color:'white'
    },
    modalButtonContainer:{
        alignSelf: 'stretch',
    }

}

export const iconButtonProps = {
    size: 30,
    underlayColor: 'rgba(17, 148, 247, 0.5)'
}