/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
export class ForgotPasswordModel {
    constructor(
        public username?: string,
        public email?: string
    ) {
        this.username = username;
        this.email = email;
    }
}

