import React, { useState, useEffect } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { Card, Badge, Text } from 'react-native-elements';
import { connect } from 'react-redux';

function GalleryScreen(props) {
	const [picturesData, setPicturesData] = useState([]);

	// HOOK GET PICTURES FROM LOCAL STORAGE
	useEffect(() => {
		AsyncStorage.getItem('storagePictures', function(error, storageData) {
			var storagePicturesData = JSON.parse(storageData);
			setPicturesData(storagePicturesData);
			props.storePicture(storagePicturesData);
		});
	}, []);

	// RETURN LIST OF PICTURES AND NOPICTURES
	var picturesList;
	var noPictures;
	if (
		props.pictures === null ||
		props.pictures === undefined ||
		props.pictures.length === 0
	) {
		noPictures = (
			<Text
				style={{
					alignSelf: 'center',
					marginTop: 20,
					fontSize: 16,
					fontWeight: 'bold'
				}}
			>
				No pictures yet, take your first one!
			</Text>
		);
	} else if (
		props.pictures !== null ||
		props.pictures !== undefined ||
		props.pictures.length !== 0
	) {
		picturesList = props.pictures.map(function(item, i) {
			return (
				<Card
					key={i}
					image={{ uri: item.pictureURL }}
					imageStyle={{ height: 250 }}
				>
					<View
					// style={{
					// 	display: 'flex',
					// 	alignItems: 'center',
					// 	justifyContent: 'center',
					// 	flexDirection: 'row',
					// }}
					>
						<Badge
							status='success'
							value={item.gender}
							badgeStyle={{
								paddingHorizontal: 5,
								paddingVertical: 10,
								backgroundColor: '#130f40',
								margin: 5
							}}
						/>
						<Badge
							status='success'
							value={item.age}
							badgeStyle={{
								paddingHorizontal: 5,
								paddingVertical: 10,
								backgroundColor: '#130f40',
								margin: 5
							}}
						/>
						<Badge
							status='success'
							value={item.glasses}
							badgeStyle={{
								paddingHorizontal: 5,
								paddingVertical: 10,
								backgroundColor: '#130f40',
								margin: 5
							}}
						/>
						<Badge
							status='success'
							value={item.beard}
							badgeStyle={{
								paddingHorizontal: 5,
								paddingVertical: 10,
								backgroundColor: '#130f40',
								margin: 5
							}}
						/>
						<Badge
							status='success'
							value={item.smile}
							badgeStyle={{
								paddingHorizontal: 5,
								paddingVertical: 10,
								backgroundColor: '#130f40',
								margin: 5
							}}
						/>
						<Badge
							status='success'
							value={item.hairColor}
							badgeStyle={{
								paddingHorizontal: 5,
								paddingVertical: 10,
								backgroundColor: '#130f40',
								margin: 5
							}}
						/>
					</View>
				</Card>
			);
		});
	}

	// RETURN PRINCIPAL
	return (
		<View style={{ flex: 1 }}>
			<Text
				style={{
					alignSelf: 'center',
					marginTop: 50,
					fontSize: 24,
					fontWeight: 'bold'
				}}
			>
				{props.pseudo}'s gallery!
			</Text>
			<ScrollView style={{ flex: 1, marginTop: 10 }}>
				{picturesList}
				{noPictures}
			</ScrollView>
		</View>
	);
}

// REDUX
function mapStateToProps(state) {
	return { pseudo: state.pseudo, pictures: state.pictures };
}

// REDUX DISPATCH
function mapDispatchToProps(dispatch) {
	return {
		storePicture: function(pictures) {
			dispatch({ type: 'setPictures', pictures: pictures });
		}
	};
}

// EXPORT
export default connect(mapStateToProps, mapDispatchToProps)(GalleryScreen);
