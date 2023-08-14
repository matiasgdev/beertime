import {ActivityIndicator} from 'react-native';
import {Button} from 'tamagui';
import {useStore} from '../store/BeerStore';

export function NextCursorButton() {
  const {status, dispatch, reachLimit, globalQuery} = useStore();

  if (reachLimit || globalQuery) {
    return null;
  }

  return (
    <Button
      disabled={status === 'pending' || status === 'refetching'}
      marginTop={16}
      minWidth={110}
      onPress={() => {
        dispatch({type: 'set_next_page'});
      }}>
      {status === 'refetching' ? (
        <ActivityIndicator color="#fff" />
      ) : (
        'Load more'
      )}
    </Button>
  );
}
