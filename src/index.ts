
const names = ["World", "Chief", "There", "Cloud", "Array", "Brand", "Cycle"];

const $ = document.querySelector.bind(document);


let DeltaTime = 0;
let LastTime = Date.now();

function lerp(a: number, b: number, t: number) {
	return a + (b - a) * t;
}

window.onload = function() {

	const element = $("#MainMessage");
	if(element === null) throw "Could not find Main message";
	const message = element as Element;
	const msgBlueprint = message.innerHTML;

	let index: number = 0;

	let fromMsg = "";
	let msg = "";
	let toMsg = "";

	let replaceMessage = () => {
		if(msg === "" && toMsg === "")
			fromMsg = toMsg = names[index];
		else {
			fromMsg = toMsg;
			toMsg = names[index]
		}
		index = ++index % names.length;
	}

	let resetTime = 5;
	let timeout = resetTime;
	function Animate() {
		//Calculate Delta time for Time specific Applications
		let CurrentTime = Date.now();
		DeltaTime = (CurrentTime - LastTime) / 1000;
		LastTime = CurrentTime;
		console.log("Current Delta time is: " + DeltaTime);

		if(timeout >= resetTime) {
			replaceMessage();
			timeout = 0;
		}

		if(fromMsg.length != toMsg.length)
			throw "Words are Different Sizes";

		if(timeout <= 2) {

			let a = fromMsg.split("").map(v => v.charCodeAt(0));
			let b = toMsg.split("").map(v => v.charCodeAt(0));

			let res = [];
			for(let i = 0; i < a.length; ++i) {
				let value = lerp(a[i], b[i], timeout / 2);
				res.push(String.fromCharCode(Math.round(value)));
			}

			msg = res.join("");
			message.innerHTML = msgBlueprint.replace("{{N}}", msg);
		} else {
			message.innerHTML = msgBlueprint.replace("{{N}}", toMsg);
		}

		timeout += DeltaTime;
		window.requestAnimationFrame(Animate);
	}

	window.requestAnimationFrame(Animate);
}